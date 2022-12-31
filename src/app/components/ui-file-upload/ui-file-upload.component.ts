import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
@Component({
  selector: 'app-ui-file-upload',
  templateUrl: './ui-file-upload.component.html',
  styleUrls: ['./ui-file-upload.component.scss'],
})
export class UiFileUploadComponent {
  @ViewChild('fileUpload') fileUpload!: FileUpload;

  @Input() label!: string;
  @Input() files: File[] = [];
  @Output() filesChange = new EventEmitter<File[]>();

  @Input() mode = 'advanced';
  @Input() multiple = false;
  @Input() showUploadButton = false;
  @Input() showCancelButton = false;
  @Input() customUpload = true;

  removeFile(toRemove: File) {
    this.fileUpload.remove(
      new Event('click'),
      this.fileUpload.files.findIndex((file) => file.name === toRemove.name)
    );
  }
}
