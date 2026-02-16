import {Component, inject} from '@angular/core';
import {FullScreenLoaderService} from '../full-screen-loader.service';

@Component({
  selector: 'app-full-screen-loader',
  imports: [],
  template: `
    @if (isLoading()) {
      <div class="loader-overlay">
        <div class="loader-content">
          <div class="spinner-container">
            <svg class="spinner" viewBox="0 0 50 50">
              <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="4"></circle>
            </svg>
          </div>
          <div class="loading-text">LOADING</div>
        </div>
        <div class="developer-credit">
          <span class="dev-label">Developed by</span>
          <span class="dev-name">"JuDa Dev"</span>
        </div>
      </div>
    }
  `,
  styles: `
    :host {
      display: block;
    }

    .loader-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(8px);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-family: 'Lato', sans-serif;
    }

    .loader-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }

    .spinner-container {
      width: 60px;
      height: 60px;
    }

    .spinner {
      animation: rotate 2s linear infinite;
      width: 100%;
      height: 100%;
    }

    .path {
      stroke: #f47521;
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }

    .loading-text {
      color: #ffffff;
      font-weight: 900;
      letter-spacing: 2px;
      font-size: 1.2rem;
      text-transform: uppercase;
    }

    .developer-credit {
      position: absolute;
      bottom: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
    }

    .dev-label {
      color: #a0a0a0;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .dev-name {
      color: #f47521;
      font-weight: 900;
      font-size: 1rem;
      letter-spacing: 0.5px;
    }

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes dash {
      0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
      }
    }
  `,
})
export class FullScreenLoader {
  isLoading = inject(FullScreenLoaderService).isLoading;
}
