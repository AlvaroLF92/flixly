import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userName = '';
  passWord = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const { userName, passWord } = this.authService.getCurrentUser();
    this.userName = userName;
    this.passWord = passWord;
  }

  onSave(): void {
    this.authService.updateCredentials({ userName: this.userName, passWord: this.passWord });
    alert('Credenciales actualizadas');
  }
}
