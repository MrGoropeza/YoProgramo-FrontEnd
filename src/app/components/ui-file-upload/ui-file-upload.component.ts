import { Component, Input, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
@Component({
  selector: 'app-ui-file-upload',
  templateUrl: './ui-file-upload.component.html',
  styleUrls: ['./ui-file-upload.component.scss'],
})
export class UiFileUploadComponent {
  @ViewChild('fileUpload') fileUpload!: FileUpload;

  @Input() label!: string;

  @Input() mode = 'advanced';
  @Input() multiple = false;
  @Input() showUploadButton = false;
  @Input() showCancelButton = false;

  removeFile(toRemove: File) {
    this.fileUpload.remove(
      new Event('click'),
      this.fileUpload.files.findIndex((file) => file.name === toRemove.name)
    );
  }
}
