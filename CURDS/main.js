let title = document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes')
let ads =document.getElementById('ads')
let discount =document.getElementById('discount')
let total =document.getElementById('total')
let count =document.getElementById('count')
let category =document.getElementById('category')
let submit =document.getElementById('submit')
let mood = 'create';
let temp

//get total
function getTotla() {
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) 
        - +discount.value;
        total.innerHTML = result
        total.style.background = '#040'
    }else{
        total.innerHTML = '';
        total.style.background = '#a00d02'
    }
}
//create product
// to not delete old we but him in array
let datapro ;
// to not delete product from localstorage
if(localStorage.product != null){
                // to be array we say json parse
    datapro = JSON.parse(localStorage.product);

}else{
    datapro= []
}

submit.onclick = function(){
    let newpro ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    // to count element

    if(price.value !='' && taxes.value !='' && count.value != "" &&newpro.count <100){

        if(mood === 'create'){
            if(newpro.count >1){
                for(let i =0; i< newpro.count ;i++){
                    datapro.push(newpro);
                }
            }else{
                datapro.push(newpro);
            }
        }
        else{
            datapro[temp] =newpro;
            mood ='create';
            submit.innerHTML ='create';
            count.style.display = 'block';
            
        }
        
        cleardata();
    }
    
  
   

    // localstorge not include array so we say json.stringfy
    localStorage.setItem('product',JSON.stringify(datapro));
    
    showdata()
}

// claer data
function cleardata(){
    title.value = '';
    price.value ='';
    taxes.value ='';
    ads.value ='';
    discount.value ='';
    total.innerHTML ='';
    count.value ='';
    category.value ='';

}
//read
 function showdata(){
    getTotla()
    let table ='';
    for(let i=0; i<datapro.length ; i++){
        table+= `
        
        <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</</td>
            <td>${datapro[i].taxes}</</td>
            <td>${datapro[i].ads}</</td>
            <td>${datapro[i].discount}</</td>
            <td>${datapro[i].total}</</td>
            <td>${datapro[i].category}</</td>
            <td><button onclick =" updateData(${i})"  id="update">Update</button></td>
            <td><button onclick =" deleteData(${i})" id="delete">Delete</button></td>

        </tr>
        `
    }
    document.getElementById("tbody").innerHTML = table;

    // to know showdata has element or not

    let btndelet = document.getElementById('delteall');
    if(datapro.length >0){

    btndelet.innerHTML =`
    <button onclick ="deletAll()" >Delete All (${datapro.length})</button>
    `
    }else{
        btndelet.innerHTML = '';
    }

 }
 showdata();

//  deletedata function
function deleteData(i){

    //to delet from array
    datapro.splice(i,1);
    //to delete from localstorge
    localStorage.product = JSON.stringify(datapro);
    //to refresh data
    showdata();
}

//deletall

function deletAll(){
    localStorage.clear();
    datapro.splice(0);
    showdata();
}

// update
function updateData(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value =datapro[i].discount;
    category.value =datapro[i].category;
    getTotla();
    count.style.display = 'none';

    submit.innerHTML ='Update'
    mood ='update';
    temp= i;
    scroll({
        top:0,
        behavior :'smooth'
    })
    
}


//serach

let searchMood ='title';

function getesearchMood(id){
    let serach = document.getElementById('search')
    if(id === "serchtitle"){
        searchMood = 'title'
        serach.placeholder = "serach by title"
    }
    else{
        searchMood ="category"
        serach.placeholder = "serach by catogrey"
    }
serach.focus();
serach.value= '';
showdata()


}
function searchData(value){
    let table = '';
    for(let i=0 ; i< datapro.length ; i++){

        if(datapro[i].category.includes(value.toLowerCase())){

            
                table+= `
                
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</</td>
                    <td>${datapro[i].taxes}</</td>
                    <td>${datapro[i].ads}</</td>
                    <td>${datapro[i].discount}</</td>
                    <td>${datapro[i].total}</</td>
                    <td>${datapro[i].category}</</td>
                    <td><button onclick =" updateData(${i})"  id="update">Update</button></td>
                    <td><button onclick =" deleteData(${i})" id="delete">Delete</button></td>
        
                </tr>
                `;
                
            
        }
    if(searchMood ='category'){

        //serch
       
        
       
      
    }
    else{
  
    }
  
    document.getElementById("tbody").innerHTML = table;
    
    }
}
