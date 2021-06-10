import React from "react";
import ImageUploader from "react-images-upload";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
  }

  toBase64 = (file) => {
    // что-то передаeт, что-то возвращает
    return new Promise((resolve) => {
      const reader = new FileReader(); //1 - встроенная функция
      console.log("reader", reader);
      //3 - если большая картинка - занимает много времени. result есть точно
      reader.onloadend = () => {
        resolve(reader.result); //4
      };

      reader.readAsDataURL(file); //2
    });
  };

  onDrop = async (picture) => {
    console.log("picture", picture);
    if (picture.length) {
      //проверяем не пустой ли массив (пустой, если файл больше - не сохраняет в стейт)
      const base64Image = await this.toBase64(picture[0]); //выбираем первый элемент массива picture (если надо больше одной картинки - map)
      this.setState({ pictures: base64Image });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.pictures.length !== this.state.pictures.length) {
      this.props.onChangeImage(this.state.pictures);
    }
  }

  render() {
    return (
      <div>
        <ImageUploader
          withIcon={true}
          buttonText="Choose images"
          onChange={this.onDrop}
          imgExtension={[".jpg", ".png"]}
          maxFileSize={5242880}
          withPreview
        />
      </div>
    );
  }
}

export default Upload;
