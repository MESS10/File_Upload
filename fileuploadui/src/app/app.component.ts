import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Image {
  filename: string;
  type: string;
  thumbnailUrl: string;
  originalUrl: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'fileUpload';
  images:Image[] = [];
  selectedImage: Image | null = null;
  multipleImages = [];
  constructor(private http: HttpClient){}

  ngOnInit(){
    this.getImages();
  }
  getImages() {
    this.http.get<Image[]>('http:Localhost:3010/uploads') // Replace with your actual endpoint URL
      .subscribe(images => this.images = images);
  }

  selectImages(image: Image) {
    this.selectedImage = image;
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  selectMultipleImage(event){
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
    }
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('file', this.images);

    this.http.post<any>('http://localhost:3011/file', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  onMultipleSubmit(){
    const formData = new FormData();
    for(let img of this.multipleImages){
      formData.append('files', img);
    }

    this.http.post<any>('http://localhost:3011/multipleFiles', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
