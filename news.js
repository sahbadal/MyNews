
const api_url = 'https://newsapi.org/v2/everything?q='


window.addEventListener('load',()=>fetchNews('india'))

function reload(){
    window.location.reload();
}


const fetchNews = async (query) =>{

    const proper_Url = `${api_url}${query}&apiKey=${api_key}`

    try {
        
        let response = await fetch(proper_Url)

        if(!response.ok){
            console.log("Newtwork response is not ok");
        }

        let data = await response.json();
        console.log((data));

        fetchData(data.articles);

    } catch (error) {
        
        console.log(error.message);

    }

}

const fetchData = (articles) =>{
    
    const container = document.getElementById('container');

    container.innerHTML = '' 

    articles.forEach(article => {


        const card  = document.createElement('div');
        card.classList.add('cards');

        const imgDiv = document.createElement('div');
        imgDiv.classList.add('image');

        const image = document.createElement('img');
        if(!article.urlToImage) return;

        image.src = article.urlToImage
        imgDiv.appendChild(image)

        const content = document.createElement('div');
        content.classList.add('content');

        const title = document.createElement('h1');
        const source = document.createElement('h5');
        const desc = document.createElement('p');

        content.appendChild(title);
        content.appendChild(source);
        content.appendChild(desc);

        title.textContent = `${article.title}`
        desc.textContent = `${article.description}`
        const date = new Date(article.publishedAt).toLocaleString('Us-en',{
            timeZone:'Asia/Jakarta'
        })
        source.textContent = `${article.source.name} : ${date}`


        card.appendChild(imgDiv)
        card.appendChild(content)
        container.appendChild(card)


 
        card.addEventListener('click',()=>{
            window.open(article.url,'_blank')
        })

        
    });

}


const btn = document.getElementById('btn')


btn.addEventListener('click',()=>{
    const inputBox = document.getElementById('inputBox');
    
    const query = inputBox.value;

    if(!query) return ;
    fetchNews(query)

    inputBox.value = ''

})

function navClick(id){
    fetchNews(id)
}


