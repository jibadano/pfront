import React from 'react'
import Typography from '@material-ui/core/Typography';
import FileUploadIcon from '@material-ui/icons/FileUpload';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button'
import { PollContext } from '.'


import { withStyles } from '@material-ui/core';

const styles = theme => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  input: {
    display: 'none'
  },
  container: {
    textAlign: 'center'
  },
  button: {
  }
})

class Media extends React.Component {

  state = { uploadImage: '' }

  handleUpload(event) {
    const { onChange } = this.props
    let reader = new FileReader()
    reader.onloadend = () => { onChange(reader.result); this.setState({ uploadImage: reader.result }) }
    reader.onloadend.bind(this)
    reader.readAsDataURL(event.target.files[0])
  }

  render() {
    const { image, edit, classes, onChange } = this.props
    const { uploadImage } = this.state
    return (
      <PollContext.Consumer>
        {edit => (
          <div>
            {edit &&
              <div className={classes.container}>
                <input className={classes.input} type="file" accept="image/*" id="raised-button-file" onChange={this.handleUpload.bind(this)} />
                <label htmlFor="raised-button-file">
                  <Button raised component="span" className={classes.button}>
                    <FileUploadIcon />
                    Image
                  </Button>
                </label>
              </div>
            }
            {(image || uploadImage) &&
              <CardMedia
                className={classes.media}
                image={image || uploadImage}
              />
            }
          </div>
        )}
      </PollContext.Consumer>
    )
  }
}
export default withStyles(styles)(Media)

