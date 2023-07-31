const category = "science"
const pageSize = 100

import fetch from "node-fetch"
import fs from "fs"

let data = []

const fetchData = async (page) => {

    let url = `https://newsapi.org/v2/everything?q=${category}&language=en&sortBy=popularity&page=${page}&pageSize=${pageSize}&apiKey=2d1c204d1f7241288e1dbeb42b179fb4`

    let info = await fetch(url)
    let input = await info.json()

    console.log(input)

    input.articles.forEach((item)=>{
        let tmp = {}

        // tmp.title = item.title
        if (item.hasOwnProperty('title')) {tmp.title = item.title}
        else {tmp.title = null}

        // tmp.description = item.description
        if (item.hasOwnProperty('description')) {tmp.description = item.description}
        else {tmp.description = null}

        tmp.newsUrl = item.url

        // tmp.imageUrl = item.urlToImage
        if (item.hasOwnProperty('urlToImage')) {tmp.imageUrl = item.urlToImage}
        else {tmp.imageUrl = null}

        // tmp.source = item.source.name
        if (item.source.hasOwnProperty('name')) {tmp.source = item.source.name}
        else {tmp.source = null}

        // tmp.publishedAt = item.publishedAt
        if (item.hasOwnProperty('publishedAt')) {tmp.publihedAt = item.publishedAt}
        else {tmp.publishedAt = null}

        tmp.category = category
    
        data.push(tmp)
    })


}

const main = async () => {
    for (let page = 2; page <= 2; page++) {

        await fetchData(page)
        await new Promise(resolve => setTimeout(resolve, 10000));
    }

    console.log(data.length)
    const str = JSON.stringify(data)
    fs.writeFile(`${category}Processed.json`, str, (err) => {
        if (err) throw err
    })
}

main()