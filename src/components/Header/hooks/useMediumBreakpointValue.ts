import theme from 'lib/theme';

function useMediumBreakpointValue() {
  const breakpoint = theme.screens.md;
  return Number(breakpoint.slice(0, breakpoint.indexOf('px')));
}

export default useMediumBreakpointValue;
