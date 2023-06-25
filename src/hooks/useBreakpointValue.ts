import theme from 'lib/theme';

function useBreakpointValue(breakpointValue: string) {
  const breakpoint = theme.screens[breakpointValue];
  return Number(breakpoint.slice(0, breakpoint.indexOf('px')));
}

export default useBreakpointValue;
