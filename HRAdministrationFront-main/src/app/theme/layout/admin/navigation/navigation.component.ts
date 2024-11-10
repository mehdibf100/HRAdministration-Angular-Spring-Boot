import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  windowWidth: number;
  @Output() NavMobCollapse = new EventEmitter();

  constructor(private router: Router, private storageService: StorageService) {
    this.windowWidth = window.innerWidth;
  }

  navMobCollapse() {
    if (this.windowWidth < 992) {
      this.NavMobCollapse.emit();
    }
  }
  onNavItemClicked(itemId: string | undefined): void {
    if (itemId === 'logout') {
      this.logout();
    }
  }
  
  logout(): void {
    this.storageService.clean(); 
    this.router.navigate(['/login']);
    this.navMobCollapse(); 
  }
}
