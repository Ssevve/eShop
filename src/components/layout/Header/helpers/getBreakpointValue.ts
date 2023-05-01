export function getBreakpointValue(breakpoint: string) {
  return +breakpoint.slice(0, breakpoint.indexOf('px'));
}