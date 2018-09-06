// ===================================================
// =                     FUNCTIONS                   =
// ===================================================

/*
  - Name: $.
  - Arguments: 'id' -> String that represents the html element's ID. (It
    must be the same [html element's ID === 'id']).
  - Objective: Returns the element to which the indicated ID belongs.
*/
function $(id){
  return document.getElementById(id);
}
