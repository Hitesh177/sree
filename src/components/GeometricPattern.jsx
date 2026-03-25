// Pochampally Ikat-inspired diamond repeat pattern
export default function GeometricPattern({ className = '', opacity = 0.045 }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%239B7A2A' stroke-width='0.7'%3E%3C!-- Outer diamond --%3E%3Cpath d='M40 4 L76 40 L40 76 L4 40 Z'/%3E%3C!-- Inner diamond --%3E%3Cpath d='M40 18 L62 40 L40 62 L18 40 Z'/%3E%3C!-- Ikat tick marks at cardinal points (woven edge blur) --%3E%3Cline x1='40' y1='4' x2='40' y2='11' stroke-width='2'/%3E%3Cline x1='40' y1='69' x2='40' y2='76' stroke-width='2'/%3E%3Cline x1='4' y1='40' x2='11' y2='40' stroke-width='2'/%3E%3Cline x1='69' y1='40' x2='76' y2='40' stroke-width='2'/%3E%3C!-- Corner dots (kolam influence) --%3E%3Ccircle cx='40' cy='4' r='1.5' fill='%239B7A2A'/%3E%3Ccircle cx='76' cy='40' r='1.5' fill='%239B7A2A'/%3E%3Ccircle cx='40' cy='76' r='1.5' fill='%239B7A2A'/%3E%3Ccircle cx='4' cy='40' r='1.5' fill='%239B7A2A'/%3E%3Ccircle cx='40' cy='40' r='2' fill='%239B7A2A' fill-opacity='0.4'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '80px 80px',
        opacity,
      }}
    />
  )
}
