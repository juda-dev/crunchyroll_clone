import {Component, inject} from '@angular/core';
import {LoadingMoreLoaderService} from '../loading-more-loader.service';

@Component({
  selector: 'app-loading-more-loader',
  imports: [],
  template: `
    @if (isLoading()) {
      <div class="loader-overlay">
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
          <div class="loading-text">Loading More Content</div>
        </div>
      </div>
    }
  `,
  styles: `
    .loader-overlay {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 200px;
      background: linear-gradient(to top,
        rgba(0, 0, 0, 0.95) 0%,
        rgba(0, 0, 0, 0.7) 40%,
        rgba(0, 0, 0, 0.3) 70%,
        transparent 100%
      );
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-direction: column;
      padding-bottom: 50px;
      z-index: 9999;
      pointer-events: none;
    }

    .loading-more-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 100%;
      padding-bottom: 40px;
    }

    .loader-wrapper {
      position: relative;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
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
      border: 2px solid rgba(60, 63, 70, 0.2);
      border-radius: 50%;
    }

    .circular-progress {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 2px solid transparent;
      border-top: 2px solid #f47521;
      border-right: 2px solid #f47521;
      border-radius: 50%;
      animation: spin 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
      filter: drop-shadow(0 0 4px rgba(244, 117, 33, 0.4));
    }

    .circular-inner {
      position: absolute;
      width: 70%;
      height: 70%;
      top: 15%;
      left: 15%;
      border-radius: 50%;
      border: 1px solid rgba(244, 117, 33, 0.1);
      background: radial-gradient(circle, rgba(244, 117, 33, 0.05) 0%, transparent 70%);
    }

    .pulse-loader {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      z-index: 2;
    }

    .pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: linear-gradient(135deg, #f47521, #ff8a40);
      box-shadow: 0 0 8px rgba(244, 117, 33, 0.5);
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
      width: 75px;
      height: 75px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(244, 117, 33, 0.25) 0%, rgba(244, 117, 33, 0.1) 30%, transparent 70%);
      animation: glow 3s ease-in-out infinite;
      z-index: 1;
    }

    .loader-decoration {
      display: flex;
      gap: 12px;
      margin-top: 25px;
    }

    .decoration-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: linear-gradient(135deg, #f47521, #ff8a40);
      box-shadow: 0 0 6px rgba(244, 117, 33, 0.4);
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
        box-shadow: 0 0 6px rgba(244, 117, 33, 0.4);
      }
      50% {
        transform: scale(1.2);
        opacity: 1;
        box-shadow: 0 0 12px rgba(244, 117, 33, 0.7);
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
        transform: translateY(0) scale(1);
        opacity: 0.5;
        box-shadow: 0 0 6px rgba(244, 117, 33, 0.4);
      }
      50% {
        transform: translateY(-6px) scale(1.2);
        opacity: 1;
        box-shadow: 0 0 10px rgba(244, 117, 33, 0.7);
      }
    }

    .loading-text {
      text-align: center;
      color: rgba(255, 255, 255, 0.7);
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      opacity: 0.7;
      animation: textPulse 2s ease-in-out infinite;
      margin-top: 10px;
    }

    @keyframes textPulse {
      0%, 100% {
        opacity: 0.5;
        text-shadow: 0 0 5px rgba(244, 117, 33, 0.3);
      }
      50% {
        opacity: 1;
        text-shadow: 0 0 10px rgba(244, 117, 33, 0.6);
      }
    }

    @media (max-width: 768px) {
      .loader-overlay {
        height: 180px;
        padding-bottom: 40px;
      }

      .loader-wrapper {
        width: 50px;
        height: 50px;
      }

      .glow-effect {
        width: 65px;
        height: 65px;
      }

      .pulse-dot {
        width: 7px;
        height: 7px;
      }

      .loader-decoration {
        margin-top: 20px;
        gap: 10px;
      }

      .decoration-dot {
        width: 4px;
        height: 4px;
      }
    }

    @media (max-width: 480px) {
      .loader-overlay {
        height: 150px;
        padding-bottom: 30px;
      }

      .loader-wrapper {
        width: 40px;
        height: 40px;
      }

      .glow-effect {
        width: 55px;
        height: 55px;
      }

      .pulse-dot {
        width: 6px;
        height: 6px;
      }

      .circular-track,
      .circular-progress {
        border-width: 2px;
      }

      .loader-decoration {
        margin-top: 15px;
        gap: 8px;
      }

      .decoration-dot {
        width: 3px;
        height: 3px;
      }
    }
  `,
})
export class LoadingMoreLoader {
  isLoading = inject(LoadingMoreLoaderService).isLoading;
}
