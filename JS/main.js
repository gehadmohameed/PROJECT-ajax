
var data=[];
getRecipes('pasta');
var links=document.querySelectorAll('.navbar .nav-link');
for(var i=0;i<links.length;i++){
    links[i].addEventListener('click',function(e){
        var CurrentMeal=e.target.innerHTML;
        getRecipes(CurrentMeal)
    })
}
function getRecipes(meal){
    var httpRequest=new XMLHttpRequest();
    httpRequest.open("GET",`https://forkify-api.herokuapp.com/api/search?q=${meal}`);
    httpRequest.send();
    httpRequest.addEventListener("readystatechange",function(){
       if(httpRequest.readyState==4){
       data=JSON.parse(httpRequest.response).recipes;
      displayData()
      //console.log(data);
    
       }
    })
}




function displayData(){
    var cols=``;
    for(var i=0;i<data.length;i++){
        cols+=
        `
        <div class="col-md-3 my-2 ">
                <div>
                    <img class='w-100 recipe-img' src="${data[i].image_url}">
                    <h5>${data[i].title}</h5>
                    <a  href='${data[i].source_url}'class='btn btn-info'>source</a>
                    <a onclick='getRecipeDetails(${data[i].recipe_id})'data-bs-toggle="modal" data-bs-target="#exampleModal" class='btn btn-warning'>Details</a>

                </div>

            </div>
            `
    }
    document.getElementById("rowData").innerHTML=cols
}

async function getRecipeDetails(recipeId){
   var response=await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`);
   var Details= await response.json();
var recipeDetailData=
`
<img class='w-100 recipe-img' src='${Details.recipe.image_url}'>
<h2>${Details.recipe.publisher}</h2>


`

  document.getElementById('RecipeData').innerHTML=recipeDetailData
}


