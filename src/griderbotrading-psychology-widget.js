class GriderBoTradingPsychologyWidget extends HTMLElement {
  constructor() {
    super();
    this.words = ["Avoid greed - set realistic profit expectations.", "Accept losses as part of trading.", "Avoid overtrading, protect your capital.", "Backtesting - review historical strategies before trading.", "Only risk what you can afford to lose.", "Risk management: set clear Stop-Loss and Take-Profit limits.", "Accept uncertainty as part of the market - stay calm during volatility.", "Admit mistakes and correct them early. Learn from your mistakes.", "Separate trading decisions from personal emotions.", "Stay consistent - repeat successful patterns, not mistakes.", "Remain patient and wait for clear signals.", "Practice continuously: improve your skills through practice.", "Self-confidence: trust your analysis and strategy.", "Do not rush decisions.", "Be flexible: change your strategy when needed.", "Willingness to learn - adapt to new market conditions.", "Set realistic goals for each trade.", "Stay disciplined, even during volatile periods.", "Understand your losses: analyze why you are losing.", "Use a trading journal for self-reflection.", "Be adaptable: respond flexibly to market changes.", "Act decisively when conditions are right.", "Focus on the process, not the outcome.", "Don't become overconfident due to your successes.", "Evaluate your performance: review your results regularly.", "Avoid impulsive decisions. Plan your trades!", "Think long-term: focus on long-term success.", "Always keep a cool head.", "Don't follow the herd mentality.", "Positive attitude: approach trading with optimism."];
    this.storageKey = 'griderbotrading-psychology-widget-data';
    this.usedWords = [];
    this.currentWord = '';
    this.isSpinning = false;
    
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
          :host {
            display: block;
            width: 500px;
            max-width: 100%;
            background: #000000;
            border: 2px solid #fe5c00;
            border-radius: 8px;
            padding: 30px 20px; /* Oberer/unterer Abstand 30px, rechts/links 20px */
            box-sizing: border-box;
            font-family: Arial, sans-serif;
          }
          
          .header {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 25px;
            margin-bottom: 20px;
          }
          
          .header img {
            display: block;
            width: 55px;
            height: 70px;
            margin-bottom: 15px;
          }

          .header h1 {
            text-align: center;
            color: #FFFFFF;
            font-size: 20px;
            margin: 0 0 15px 0;
          }
          
          .powered-by {
            color: #fe5c00;
            text-align: center;
            font-size: 14px;
            margin-bottom: 2px;
          }
          
          .griderbotrading-link-container {
            text-align: center;
            margin-bottom: 15px;
          }
          
          .griderbotrading-link {
            color: #FFC18B;
            font-size: 12px;
            text-align: center;
            text-decoration: none;
            transition: color 0.3s ease;
          }
          
          .griderbotrading-link:hover {
            color: #FFFFFF;
            text-decoration: none;
          }
          
          .word-display {
            background: #BDBDBD;
            color: #fe5c00;
            padding: 10px;
            border-radius: 8px;
            text-align: center;
            font-size: 19px;
            font-weight: bold;
            margin-top: 10px;
            margin-bottom: 20px;
            min-height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: calc(100% - 50px);
            margin-left: auto;
            margin-right: auto;
          }
          
          .button-container {
            text-align: center;
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-bottom: 15px;
          }
          
          button {
            background: #fe5c00;
            color: #FFFFFF;
            border: none;
            padding: 12px 25px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s;
          }
          
          button:hover {
            opacity: 0.9;
            color: #000000;
          }
          
          button:active {
            color: #000000 !important;
          }
          
          button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          
          #resetButton {
            background: #444444;
          }
          
          #resetButton:hover {
            background: #666666;
          }
          
          .disclaimer {
            font-size: 11px;
            color: #BDBDBD;
            text-align: center;
            margin-top: 20px;
            margin-bottom: 20px;
            padding: 0 10px;
          }

          @keyframes blinkAnimation {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
          }

          .blink {
            animation: blinkAnimation 0.3s;
          }
      </style>
      
      <div class="header">
          <img src="https://assets.zyrosite.com/dJo5w9z2aZipBwrW/griderbotrading_widgets-m6LjBXoGkzCoV3oo.png" alt="GriderBoTrading Logo">
          <h1>Trading Psychology 30-Day Random</h1>
          <div class="powered-by">Powered by GriderBoTrading</div>
          <div class="griderbotrading-link-container">
            <a href="https://griderbotrading.com" target="_blank" class="griderbotrading-link">https://griderbotrading.com</a>
          </div>
        </div>
        <div id="wordDisplay" class="word-display">Click Shuffle to start</div>
        <div class="button-container">
          <button id="shuffleButton">Shuffle</button>
          <button id="resetButton">Reset</button>
        </div>
        <div class="disclaimer">
          This trading psychologies widget is for entertainment purposes and does not constitute financial advice.
        </div>
      `;

      this.wordDisplay = this.shadowRoot.querySelector('#wordDisplay');
      this.shuffleButton = this.shadowRoot.querySelector('#shuffleButton');
      this.resetButton = this.shadowRoot.querySelector('#resetButton');
    }

    connectedCallback() {
      this.loadData();
      this.checkDate();
      this.shuffleButton.addEventListener('click', () => this.shuffleWord());
      this.resetButton.addEventListener('click', () => this.resetData());
      this.updateDisplay();
    }

    loadData() {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        const { lastDate, usedWords } = JSON.parse(data);
        this.lastDate = new Date(lastDate);
        this.usedWords = usedWords;
      } else {
        this.lastDate = new Date();
        this.saveData();
      }
    }

    saveData() {
      const data = {
        lastDate: this.lastDate.toISOString(),
        usedWords: this.usedWords
      };
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    }
    
    resetData() {
      if (confirm('Are you sure you want to reset your 30-day cycle? This will clear all your used words.')) {
        this.usedWords = [];
        this.lastDate = new Date();
        this.currentWord = '';
        this.saveData();
        this.updateDisplay();
        alert('Reset complete! Your 30-day cycle has been restarted.');
      }
    }

    checkDate() {
      const now = new Date();
      const diffTime = Math.abs(now - this.lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays >= 30) {
        this.usedWords = [];
        this.lastDate = now;
        this.saveData();
      }
    }

    getRandomWord() {
      const availableWords = this.words.filter(word => !this.usedWords.includes(word));
      if (availableWords.length === 0) return null;
      
      const randomIndex = Math.floor(Math.random() * availableWords.length);
      const word = availableWords[randomIndex];
      this.usedWords.push(word);
      return word;
    }
    
    blinkElement(element) {
      element.classList.add('blink');
      setTimeout(() => {
        element.classList.remove('blink');
      }, 300);
    }

    shuffleWord() {
      if (this.isSpinning) return;
      
      this.checkDate();
      this.isSpinning = true;
      this.shuffleButton.disabled = true;
      
      // Get final word
      const finalWord = this.getRandomWord();
      if (!finalWord) {
        this.isSpinning = false;
        this.shuffleButton.disabled = false;
        return;
      }
      
      // Generate random words
      const animationWords = [];
      for (let i = 0; i < 20; i++) {
        const randomIndex = Math.floor(Math.random() * this.words.length);
        animationWords.push(this.words[randomIndex]);
      }
      
      // Add the selected word at the end
      animationWords.push(finalWord);
      
      // Start animation
      let currentIndex = 0;
      const startTime = Date.now();
      const totalDuration = 2000; // Total animation duration in ms
      
      const animationStep = () => {
        // Calculate progress
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / totalDuration, 1);
        
        // Update display
        this.wordDisplay.textContent = animationWords[currentIndex];
        this.blinkElement(this.wordDisplay);
        
        // Increment index
        currentIndex++;
        
        // Check if animation should continue
        if (progress < 1 && currentIndex < animationWords.length - 1) {
          // Calculate delay - slows down as progress increases
          const baseDelay = 50; // minimum delay
          const maxDelay = 400; // maximum delay
          const delay = baseDelay + (maxDelay - baseDelay) * Math.pow(progress, 2);
          
          setTimeout(animationStep, delay);
        } else {
          // Animation done, show final word
          this.wordDisplay.textContent = finalWord;
          this.currentWord = finalWord;
          this.isSpinning = false;
          this.shuffleButton.disabled = false;
          this.saveData();
        }
      };
      
      // Start the animation
      animationStep();
    }

    updateDisplay() {
      this.wordDisplay.textContent = this.currentWord || 'Click Shuffle to start';
    }
  }

customElements.define('griderbotrading-psychology-widget', GriderBoTradingPsychologyWidget);
