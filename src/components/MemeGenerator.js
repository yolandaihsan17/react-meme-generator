import React from 'react'

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default class MemeGenerator extends React.Component {
    memeUrl = 'https://api.imgflip.com/get_memes'

    constructor() {
        super()
        this.state = {
            topText: '',
            bottomText: '',
            memeImage: {
                url: ''
            },
            allMemeImages: []
        }
        this.getMemes = this.getMemes.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.getMemes()
    }

    getMemes() {
        fetch(this.memeUrl).then(res => res.json()).then((res) => {
            const { memes } = res.data
            this.setState({ allMemeImages: memes })
            this.getRandomImage()
        })
    }

    handleOnChange(event) {
        const { name, value } = event.target
        this.setState({ [name]: value })
        console.log(name, value)
    }

    getRandomImage() {
        this.setState(() => {
            return {
                memeImage: this.state.allMemeImages[Math.floor(Math.random() * this.state.allMemeImages.length)]
            }
        })

        setTimeout(() => {
            console.log(this.state)
        }, 100)
    }

    handleSubmit(event) {
        event.preventDefault()
        this.setState({ memeImage: this.state.allMemeImages[Math.floor(Math.random() * this.state.allMemeImages.length)] })
    }

    render() {
        const memeFont = {
            fontSize: '2rem',
            fontWeight: 'bold',
            color: 'white',
            textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000',
            wordBreak: 'break-all'
        }

        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
                        <Grid item>
                            <TextField
                                id="outlined-required"
                                label="Top Text"
                                type="text"
                                name="topText"
                                value={this.state.topText}
                                placeholder="Top Text"
                                onChange={this.handleOnChange}
                                autoComplete="off"
                            />

                        </Grid>

                        <Grid item>
                            <TextField
                                id="outlined-required"
                                label="Bottom Text"
                                type="text"
                                name="bottomText"
                                value={this.state.bottomText}
                                placeholder="Bottom Text"
                                onChange={this.handleOnChange}
                                autoComplete="off"
                            />
                        </Grid>

                        <Grid item>
                            <Button variant="contained" onClick={this.handleSubmit}> Change Meme</Button>
                        </Grid>
                    </Grid>
                </form>
                <div className="container">
                    <img src={this.state.memeImage.url} alt="Snow" style={{ width: '100%' }} />
                    <div className="centered-top" style={memeFont}>{this.state.topText}</div>
                    <div className="centered-bottom" style={memeFont}>{this.state.bottomText}</div>
                </div>

            </div>
        )
    }
}