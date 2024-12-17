
// Event handling for the drop-down menus

const submenuHolography = document .getElementById( "submenu-holography" );
const submenuFractals = document .getElementById( "submenu-fractals" );

document .getElementById( "toggle-holography" ) .addEventListener( "click", evt => {
  if ( submenuHolography .style .display === "none" ) {
    submenuHolography .style .display = "block";
    evt .stopPropagation(); // don't let the event fall through to the nav listener below
  }
});
document .getElementById( "toggle-fractals" ) .addEventListener( "click", evt => {
  if ( submenuFractals .style .display === "none" ) {
    submenuFractals .style .display = "block";
    evt .stopPropagation(); // don't let the event fall through to the nav listener below
  }
});
document .querySelector( "body" ) .addEventListener( "click", () => {
  submenuHolography .style .display = "none";
  submenuFractals .style .display = "none";
});
