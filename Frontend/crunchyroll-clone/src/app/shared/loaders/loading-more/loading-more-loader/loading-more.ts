import {Component, inject} from '@angular/core';
import {LoadingMoreLoaderService} from '../loading-more-loader.service';

@Component({
  selector: 'app-loading-more-loader',
  imports: [],
  template: `
    @if (isLoading()) {
      <div class="loading-more-container">
        <div class="loader-wrapper">
          <div class="pulse-loader">
            <div class="pulse-dot"></div>
            <div class="pulse-dot"></div>
            <div class="pulse-dot"></div>
          </div>

          <div class="circular-loader">
            <div class="circular-track"></div>
            <div class="circular-progress"></div>
            <div class="circular-inner"></div>
          </div>

          <div class="glow-effect"></div>
        </div>

        <div class="loader-decoration">
          <div class="decoration-dot"></div>
          <div class="decoration-dot"></div>
          <div class="decoration-dot"></div>
        </div>
      </div>
    }
  `,
  styles: `
    .loading-more-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      margin: 20px auto;
      max-width: 1400px;
      position: relative;
    }

    .loader-wrapper {
      position: relative;
      width: 120px;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .circular-loader {
      position: absolute;
      width: 100%;
      height: 100%;
      animation: rotate 2s linear infinite;
    }

    .circular-track {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 4px solid rgba(60, 63, 70, 0.3);
      border-radius: 50%;
      box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
    }

    .circular-progress {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 4px solid transparent;
      border-top: 4px solid #f47521;
      border-right: 4px solid #f47521;
      border-radius: 50%;
      filter: drop-shadow(0 0 8px rgba(244, 117, 33, 0.6));
      animation: spin 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
    }

    .circular-inner {
      position: absolute;
      width: 70%;
      height: 70%;
      top: 15%;
      left: 15%;
      background: radial-gradient(circle, rgba(244, 117, 33, 0.15) 0%, transparent 70%);
      border-radius: 50%;
      border: 2px solid rgba(244, 117, 33, 0.1);
    }

    .pulse-loader {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      z-index: 2;
    }

    .pulse-dot {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: linear-gradient(135deg, #f47521, #ff9e5e);
      box-shadow: 0 0 12px rgba(244, 117, 33, 0.8);
      animation: pulse 1.4s ease-in-out infinite;
    }

    .pulse-dot:nth-child(1) {
      animation-delay: -0.32s;
    }

    .pulse-dot:nth-child(2) {
      animation-delay: -0.16s;
    }

    .glow-effect {
      position: absolute;
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(244, 117, 33, 0.2) 0%, transparent 70%);
      filter: blur(8px);
      animation: glow 3s ease-in-out infinite;
    }

    .loader-decoration {
      display: flex;
      gap: 24px;
      margin-top: 40px;
    }

    .decoration-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: rgba(244, 117, 33, 0.4);
      animation: decoration 2s ease-in-out infinite;
    }

    .decoration-dot:nth-child(1) {
      animation-delay: 0s;
    }

    .decoration-dot:nth-child(2) {
      animation-delay: 0.4s;
    }

    .decoration-dot:nth-child(3) {
      animation-delay: 0.8s;
    }

    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
        border-top-color: #f47521;
        border-right-color: #f47521;
      }
      50% {
        border-top-color: #ff8a40;
        border-right-color: #ff8a40;
      }
      100% {
        transform: rotate(360deg);
        border-top-color: #f47521;
        border-right-color: #f47521;
      }
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(0.8);
        opacity: 0.5;
        box-shadow: 0 0 8px rgba(244, 117, 33, 0.6);
      }
      50% {
        transform: scale(1.2);
        opacity: 1;
        box-shadow: 0 0 20px rgba(244, 117, 33, 1);
      }
    }

    @keyframes glow {
      0%, 100% {
        opacity: 0.3;
        transform: scale(0.95);
      }
      50% {
        opacity: 0.6;
        transform: scale(1.05);
      }
    }

    @keyframes decoration {
      0%, 100% {
        transform: translateY(0);
        background-color: rgba(244, 117, 33, 0.4);
      }
      50% {
        transform: translateY(-10px);
        background-color: rgba(244, 117, 33, 0.8);
      }
    }

    @media (max-width: 768px) {
      .loading-more-container {
        padding: 30px 16px;
        margin: 16px auto;
      }

      .loader-wrapper {
        width: 100px;
        height: 100px;
      }

      .glow-effect {
        width: 120px;
        height: 120px;
      }

      .pulse-dot {
        width: 14px;
        height: 14px;
      }

      .loader-decoration {
        margin-top: 30px;
        gap: 20px;
      }
    }

    @media (max-width: 480px) {
      .loading-more-container {
        padding: 24px 12px;
        margin: 12px auto;
      }

      .loader-wrapper {
        width: 80px;
        height: 80px;
      }

      .glow-effect {
        width: 100px;
        height: 100px;
      }

      .pulse-dot {
        width: 12px;
        height: 12px;
      }

      .circular-track,
      .circular-progress {
        border-width: 3px;
      }

      .loader-decoration {
        margin-top: 24px;
        gap: 16px;
      }

      .decoration-dot {
        width: 6px;
        height: 6px;
      }
    }

    .loading-more-container:hover .circular-progress {
      border-top-color: #ff8a40;
      border-right-color: #ff8a40;
      filter: drop-shadow(0 0 12px rgba(244, 117, 33, 0.8));
    }

    .loading-more-container:hover .pulse-dot {
      background: linear-gradient(135deg, #ff8a40, #ffb085);
    }
  `,
})
export class LoadingMoreLoader {
  isLoading = inject(LoadingMoreLoaderService).isLoading;
}
