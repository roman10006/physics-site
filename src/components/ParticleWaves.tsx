import { useEffect, useRef } from 'react'

export const ParticleWaves = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles: { x: number; y: number; baseX: number; baseY: number; size: number }[] = []
    const spacing = 8
    const rows = 12

    const initParticles = () => {
      particles.length = 0
      for (let row = 0; row < rows; row++) {
        for (let x = 0; x < canvas.width; x += spacing) {
          particles.push({
            x,
            y: canvas.height / 2 + (row - rows / 2) * 20,
            baseX: x,
            baseY: canvas.height / 2 + (row - rows / 2) * 20,
            size: 1.5,
          })
        }
      }
    }
    initParticles()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.008

      particles.forEach((p) => {
        const wave1 = Math.sin(p.baseX * 0.003 + time) * 60
        const wave2 = Math.sin(p.baseX * 0.005 - time * 0.8) * 40
        const wave3 = Math.cos(p.baseX * 0.002 + time * 0.6) * 30
        
        p.y = p.baseY + wave1 + wave2 + wave3
        
        const distanceFromCenter = Math.abs(p.y - canvas.height / 2)
        const opacity = Math.max(0, 1 - distanceFromCenter / 200)
        const brightness = Math.floor(180 + opacity * 75)
        
        ctx.fillStyle = `rgba(${brightness}, ${Math.floor(brightness * 0.6)}, 255, ${opacity * 0.8})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}