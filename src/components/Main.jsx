import { useState, useEffect } from "react";

export default function Main() {
    const [meme , setMeme] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imageUrl: "http://i.imgflip.com/1bij.jpg"
    });

    const [allMemes, setAllMemes] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes").then(res => res.json()).then(data => setAllMemes(data.data.memes))
    }, []);

    const handleChange = (event) => {
        const {value, name} = event.target;
        setMeme(prevMeme => ({ ...prevMeme, [name]: value }));
    }
    const changeImage = () => {
        const random = Math.floor(Math.random() * allMemes.length);
        const newMemeUrl = allMemes[random].url
        setMeme(prevMeme => ({ ...prevMeme, imageUrl: newMemeUrl }));
    }
    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                        value={meme.bottomText}
                    />
                </label>
                <button onClick={changeImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} alt={"Meme image"}/>
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}