var jQueryScript = document.createElement('script');  
jQueryScript.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');
document.head.appendChild(jQueryScript);

$(document).ready(function(){

  $('.delete-candidate').on('click',function(e){
      console.log("inside");
    $target = $(e.target);
    var id = $target.attr('data-id');
    $.ajax({
      type:'DELETE',
      url:'/candidate_delete/'+id,
      success:function(response){
        alert("Deleting the selected candidate!!");
        window.location.href='/';
      },
      error:function(err){
        window.location.href='/';
      }
    });
  });
});
