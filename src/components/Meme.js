import React from "react"

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes] = React.useState([])

    // 
    // ASYNC METHOD
    // 
    // React.useEffect(() => {
    //     async function getMemes() {
    //         const res = await fetch("https://api.imgflip.com/get_memes")
    //         const data = await res.json()
    //         setAllMemes(data.data.memes)
    //     }
    //     getMemes()
    // }, []
    // )

    React.useEffect(() => {
        // console.log("render")
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, []
    )

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevAllMemes => ({...prevAllMemes, randomImage: url}))
    }

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <main>
            <div className="form">
                <input 
                    type="text" 
                    placeholder="Top text" 
                    className="form--input" 
                    name="topText"
                    onChange={handleChange}
                    value={meme.topText}
                />

                <input 
                    type="text" 
                    placeholder="Bottom text" 
                    className="form--input"
                    name="bottomText"
                    onChange={handleChange}
                    value={meme.bottomText}

                />

                <button 
                    className="form--button" 
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼️
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} alt="" className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
            {/* <pre>{JSON.stringify(allMemes, null, 2)}</pre> */}
        </main>
    )
}