"use client"
import { OrbitingCircles } from "@/components/ui/orbiting-circles"
import { useWindowSize } from "@/hooks/use-window-size"
import { cn } from "@/lib/utils"

export const OrbitingCirclesSection = ({
  className,
}: {
  className?: string
}) => {
  const windowSize = useWindowSize()

  return (
    <div
      className={cn(
        "relative flex h-[400px] sm:h-[600px] w-full flex-col items-center justify-center overflow-hidden",
        className
      )}
    >
      <OrbitingCircles
        iconSize={windowSize?.width < 783 ? 35 : 50}
        radius={windowSize?.width < 783 ? 140 : 250}
        speed={0.5}
      >
        <Icons.blueStars />
        <Icons.myGate />
        <Icons.urbanVault />
        <Icons.finagg />
        <Icons.liveSpace />
      </OrbitingCircles>
      <OrbitingCircles
        iconSize={windowSize?.width < 783 ? 35 : 50}
        radius={windowSize?.width < 783 ? 100 : 170}
        reverse
        speed={0.6}
      >
        <Icons.apna />
        <Icons.finagg />
        <Icons.electricPe />
        <Icons.myGate />
      </OrbitingCircles>
      <OrbitingCircles
        iconSize={windowSize?.width < 783 ? 35 : 50}
        radius={windowSize?.width < 783 ? 55 : 85}
      >
        <Icons.urbanVault />
        <Icons.apna />
        <Icons.electricPe />
        <Icons.apnaMart />
      </OrbitingCircles>
      <div className="px-3 cursor-pointer bg-neutral-50 rounded-full size-12 font-orange text-5xl  flex justify-center items-center z-10">
        <img src="/edify-logo.svg" alt="edify-logo" className="size-28" />
      </div>
    </div>
  )
}

const Icons = {
  blueStars: () => (
    <img
      src="/media/orbiting-circles/blue_stars.png"
      alt="metaFin"
      className=""
      loading="lazy"
    />
  ),
  apna: () => (
    <img
      src="/media/orbiting-circles/apna.png"
      alt="metaFin"
      className=""
      loading="lazy"
    />
  ),
  apnaMart: () => (
    <img
      src="/media/orbiting-circles/apna_mart.png"
      alt="metaFin"
      className=""
      loading="lazy"
    />
  ),
  liveSpace: () => (
    <img
      src="/media/orbiting-circles/live_space.png"
      alt="metaFin"
      className=""
      loading="lazy"
    />
  ),

  urbanVault: () => (
    <img
      src="/media/orbiting-circles/urban_vault.png"
      alt="urban_vault"
      className=""
      loading="lazy"
    />
  ),
  finagg: () => (
    <img
      src="/media/orbiting-circles/finagg.png"
      alt="Finagg"
      className=""
      loading="lazy"
    />
  ),
  electricPe: () => (
    <img
      src="/media/orbiting-circles/electric_pe.png"
      alt="electric_pe"
      className=""
      loading="lazy"
    />
  ),
  myGate: () => (
    <img
      src="/media/orbiting-circles/my_gate.png"
      alt="my_gate"
      className=""
      loading="lazy"
    />
  ),
}
