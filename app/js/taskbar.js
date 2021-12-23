const hideDropdown = ( ) => {
  $('.dropdown').removeClass('show');
}

const onDocumentClick = event => {
  const elm = $('.dropdown').has(event.target).length > 0;
  if(!elm) hideDropdown();
}

const onDropdownClick = event => {
  let dropdown = $('.dropdown').has(event.target)[0];
  $('.dropdown').not(dropdown).removeClass('show');
  $(dropdown).toggleClass('show');
}

const onNewClick = event => {
  document.dispatchEvent(new CustomEvent('createProject'));
  hideDropdown( );
}

const onSaveClick = event => {
  document.dispatchEvent(new CustomEvent('saveProject'));
  hideDropdown( );
}

const bindOptions = ( ) => {
  $(document).click(onDocumentClick);
  $('.dropdown').click(onDropdownClick);
  $('.tnew').click(onNewClick);
  $('.tsave').click(onSaveClick);
}

export default function( ) {
  bindOptions( );
}
