import theme from 'theme';

function useMediumBreakpointValue() {
  const breakpoint = theme.theme.screens.md;
  return Number(breakpoint.slice(0, breakpoint.indexOf('px')));
}

export default useMediumBreakpointValue;
