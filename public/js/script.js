const sideMenuBtn = document.getElementById('side-menu-btn')
const optionBtns = document.getElementsByClassName('side-option-btn')

sideMenuBtn.addEventListener('click', ()=>{
    $('#side-menu').fadeToggle(500)
})

$('#back-button').click(function(){
    $('#side-menu').fadeToggle(500)
})

function getBooks(category, categoryTitle){
    $('#book-box').empty()
    $('#category-title').text(categoryTitle)
    $.ajax({
        method:"GET",
        url:"/getbook",
        data:{
            type:category
        },
        success:function(data){
            let jsonB = JSON.parse(data)
            for(jsonObj of jsonB){
                let newBook = `
                    <div class="book-card">
                        <img src="${jsonObj['imgurl']}" alt="book img">
                        <h2 class="book-title">${jsonObj['title']}</h2>
                        <p>${jsonObj['author']}</p>
                        <b>${jsonObj['price']}</b>
                        <button class="buy-btn">Buy</button>
                    </div>
                        `
                $('#book-box').append(newBook)
            }
        }
    })
}

for(let i = 0; i < optionBtns.length; i++){
    optionBtns[i].addEventListener('click', function(tag) {
        getBooks(this.getAttribute('cat'), this.innerHTML)        
    })
}
