/** biome-ignore-all lint/a11y/noNoninteractiveElementInteractions: library constrains */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: library constrains */
import { cn } from "@repo/tailwind";
import { Button } from "@repo/ui/Button";
import { Maximize2, Minimize2, Minus, Plus, RotateCcw, X } from "@repo/ui/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { type ReactZoomPanPinchRef, TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

interface FullscreenViewerProps {
    src: string;
    alt?: string;
    isOpen: boolean;
    onClose: () => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 8;
const ZOOM_STEP = 0.5;
const CONTROLS_HIDE_DELAY = 3000;
const SCALE_PERCENTAGE_MULTIPLIER = 100;

const FullscreenViewer = ({ src, alt, isOpen, onClose }: FullscreenViewerProps) => {
    const [scale, setScale] = useState(1);
    const [showControls, setShowControls] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const transformRef = useRef<ReactZoomPanPinchRef>(null);
    const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const scheduleHideControls = useCallback(() => {
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
        setShowControls(true);
        controlsTimeoutRef.current = setTimeout(() => {
            if (scale > 1) {
                setShowControls(false);
            }
        }, CONTROLS_HIDE_DELAY);
    }, [scale]);

    const handleMouseMove = useCallback(() => {
        scheduleHideControls();
    }, [scheduleHideControls]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                e.stopPropagation();
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    onClose();
                }
            } else if (e.key === "+" || e.key === "=") {
                transformRef.current?.zoomIn(ZOOM_STEP);
            } else if (e.key === "-") {
                transformRef.current?.zoomOut(ZOOM_STEP);
            } else if (e.key === "0") {
                transformRef.current?.resetTransform();
            }
        };

        const handleFullscreenChange = () => {
            setIsFullscreen(document.fullscreenElement !== null);
        };

        document.addEventListener("keydown", handleKeyDown, true);
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown, true);
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            document.body.style.overflow = "";
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            setScale(1);
            setShowControls(true);
            requestAnimationFrame(() => {
                overlayRef.current?.requestFullscreen();
            });
        }
    }, [isOpen]);

    const handleTransform = useCallback(
        (ref: ReactZoomPanPinchRef) => {
            const newScale = ref.state.scale;
            setScale(newScale);
            scheduleHideControls();
        },
        [scheduleHideControls]
    );

    const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseFloat(e.target.value);
        transformRef.current?.centerView(value);
    }, []);

    const handleZoomIn = useCallback(() => {
        transformRef.current?.zoomIn(ZOOM_STEP);
    }, []);

    const handleZoomOut = useCallback(() => {
        transformRef.current?.zoomOut(ZOOM_STEP);
    }, []);

    const handleReset = useCallback(() => {
        transformRef.current?.resetTransform();
    }, []);

    const handleToggleFullscreen = useCallback(() => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            overlayRef.current?.requestFullscreen();
        }
    }, []);

    const scalePercent = Math.round(((scale - MIN_SCALE) / (MAX_SCALE - MIN_SCALE)) * SCALE_PERCENTAGE_MULTIPLIER);

    if (!isOpen) {
        return null;
    }

    return createPortal(
        <div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Fullscreen image viewer"
            className={cn(
                "fixed inset-0 z-100",
                "bg-black/90 supports-backdrop-filter:backdrop-blur-sm",
                "animate-in fade-in-0 duration-200"
            )}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
            onMouseMove={handleMouseMove}
        >
            <div
                className={cn(
                    "absolute top-4 right-4 z-110 transition-opacity duration-300",
                    showControls ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
            >
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white/80 hover:text-white hover:bg-white/10 size-10"
                    onClick={onClose}
                >
                    <X className="size-5" />
                    <span className="sr-only">Close fullscreen</span>
                </Button>
            </div>

            <TransformWrapper
                ref={transformRef}
                initialScale={1}
                minScale={MIN_SCALE}
                maxScale={MAX_SCALE}
                wheel={{ step: 0.15 }}
                pinch={{ step: 10 }}
                doubleClick={{ mode: "reset" }}
                onTransform={handleTransform}
                panning={{ velocityDisabled: true }}
            >
                <TransformComponent
                    wrapperStyle={{
                        width: "100vw",
                        height: "100vh",
                    }}
                    contentStyle={{
                        width: "100vw",
                        height: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <img
                        src={src}
                        alt={alt}
                        className="max-w-[95vw] max-h-[90vh] object-contain select-none"
                        draggable={false}
                    />
                </TransformComponent>
            </TransformWrapper>

            <div
                className={cn(
                    "absolute bottom-6 left-1/2 -translate-x-1/2 z-110",
                    "flex items-center gap-2 px-3 py-2 rounded-xl",
                    "bg-black/60 supports-backdrop-filter:backdrop-blur-xl",
                    "border border-white/10 shadow-2xl",
                    "transition-all duration-300",
                    showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                )}
            >
                <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-white/80 hover:text-white hover:bg-white/15"
                    onClick={handleZoomOut}
                    disabled={scale <= MIN_SCALE}
                >
                    <Minus className="size-4" />
                    <span className="sr-only">Zoom out</span>
                </Button>

                <div className="flex items-center gap-2 px-1">
                    <input
                        type="range"
                        min={MIN_SCALE}
                        max={MAX_SCALE}
                        step={0.1}
                        value={scale}
                        onChange={handleSliderChange}
                        className={cn(
                            "w-28 h-1 rounded-full appearance-none cursor-pointer",
                            "bg-white/20",
                            "[&::-webkit-slider-thumb]:appearance-none",
                            "[&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5",
                            "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white",
                            "[&::-webkit-slider-thumb]:shadow-md",
                            "[&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150",
                            "[&::-webkit-slider-thumb]:hover:scale-125",
                            "[&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5",
                            "[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white",
                            "[&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md"
                        )}
                    />
                    <span className="text-white/70 text-xs font-mono tabular-nums min-w-[3ch] text-right">
                        {scalePercent}%
                    </span>
                </div>

                <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-white/80 hover:text-white hover:bg-white/15"
                    onClick={handleZoomIn}
                    disabled={scale >= MAX_SCALE}
                >
                    <Plus className="size-4" />
                    <span className="sr-only">Zoom in</span>
                </Button>

                <div className="w-px h-5 bg-white/20 mx-1" />

                <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-white/80 hover:text-white hover:bg-white/15"
                    onClick={handleReset}
                    disabled={scale === 1}
                >
                    <RotateCcw className="size-4" />
                    <span className="sr-only">Reset zoom</span>
                </Button>

                <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-white/80 hover:text-white hover:bg-white/15"
                    onClick={handleToggleFullscreen}
                >
                    {isFullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
                    <span className="sr-only">{isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}</span>
                </Button>
            </div>
        </div>,
        document.body
    );
};

export { FullscreenViewer };
