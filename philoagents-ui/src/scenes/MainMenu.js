import { Scene } from 'phaser';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        // this.add.image(510, 260, 'logo').setScale(0.55);

        const startX = 150;
        const startY = 100;
        const buttonSpacing = 175;

        this.createButton(startX, startY, 'Enter YC Startup School', () => {
            this.scene.start('Game');
        });

        this.createButton(startX + buttonSpacing * 2, startY , 'Getting Started Guide', () => {
            this.showInstructions();
        });

        this.createButton(startX + buttonSpacing * 4, startY  ,'Access GitHub Files', () => {
            window.open('https://github.com/deepsuchak/YC-AI-Startup-School', '_blank');
        });
    }

    createButton(x, y, text, callback) {
        const buttonWidth = 200;
        const buttonHeight = 60;
        const cornerRadius = 20;
        const maxFontSize = 28;
        const padding = 10;

        const shadow = this.add.graphics();
        shadow.fillStyle(0x666666, 1);
        shadow.fillRoundedRect(x - buttonWidth / 2 + 4, y - buttonHeight / 2 + 4, buttonWidth, buttonHeight, cornerRadius);

        const button = this.add.graphics();
        button.fillStyle(0xffffff, 1);
        button.fillRoundedRect(x - buttonWidth / 2, y - buttonHeight / 2, buttonWidth, buttonHeight, cornerRadius);
        button.setInteractive(
            new Phaser.Geom.Rectangle(x - buttonWidth / 2, y - buttonHeight / 2, buttonWidth, buttonHeight),
            Phaser.Geom.Rectangle.Contains
        );

        let fontSize = maxFontSize;
        let buttonText;
        do {
            if (buttonText) buttonText.destroy();
            
            buttonText = this.add.text(x, y, text, {
                fontSize: `${fontSize}px`,
                fontFamily: 'Arial',
                color: '#000000',
                fontStyle: 'bold',
                align: 'center',
            }).setOrigin(0.5);

            fontSize -= 1;
        } while (buttonText.width > buttonWidth - padding && fontSize > 10);

        button.on('pointerover', () => {
            this.updateButtonStyle(button, shadow, x, y, buttonWidth, buttonHeight, cornerRadius, true);
            buttonText.y -= 2;
        });

        button.on('pointerout', () => {
            this.updateButtonStyle(button, shadow, x, y, buttonWidth, buttonHeight, cornerRadius, false);
            buttonText.y += 2;
        });

        button.on('pointerdown', callback);
        
        return { button, shadow, text: buttonText };
    }

    updateButtonStyle(button, shadow, x, y, width, height, radius, isHover) {
        button.clear();
        shadow.clear();
        
        if (isHover) {
            button.fillStyle(0x87CEEB, 1);
            shadow.fillStyle(0x888888, 1);
            shadow.fillRoundedRect(x - width / 2 + 2, y - height / 2 + 2, width, height, radius);
        } else {
            button.fillStyle(0xffffff, 1);
            shadow.fillStyle(0x666666, 1);
            shadow.fillRoundedRect(x - width / 2 + 4, y - height / 2 + 4, width, height, radius);
        }
        
        button.fillRoundedRect(x - width / 2, y - height / 2, width, height, radius);
    }

    showInstructions() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const centerX = width / 2;
        const centerY = height / 2;
        
        const elements = this.createInstructionPanel(centerX, centerY);
        
        const instructionContent = this.addInstructionContent(centerX, centerY, elements.panel);
        elements.title = instructionContent.title;
        elements.textElements = instructionContent.textElements;
        
        const closeElements = this.addCloseButton(centerX, centerY + 79, () => {
            this.destroyInstructionElements(elements);
        });
        elements.closeButton = closeElements.button;
        elements.closeText = closeElements.text;
        
        elements.overlay.on('pointerdown', () => {
            this.destroyInstructionElements(elements);
        });
    }
    
    createInstructionPanel(centerX, centerY) {
        const overlay = this.add.graphics();
        overlay.fillStyle(0x000000, 0.7);
        overlay.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
        overlay.setInteractive(
            new Phaser.Geom.Rectangle(0, 0, this.cameras.main.width, this.cameras.main.height),
            Phaser.Geom.Rectangle.Contains
        );
        
        const panel = this.add.graphics();
        panel.fillStyle(0xffffff, 1);
        panel.fillRoundedRect(centerX - 200, centerY - 150, 400, 300, 20);
        panel.lineStyle(4, 0x000000, 1);
        panel.strokeRoundedRect(centerX - 200, centerY - 150, 400, 300, 20);
        
        return { overlay, panel };
    }
    
    addInstructionContent(centerX, centerY, panel) {
        const title = this.add.text(centerX, centerY - 110, 'INSTRUCTIONS', {
            fontSize: '28px',
            fontFamily: 'Arial',
            color: '#000000',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        const instructions = [
            'Arrow keys to move around',
            'SPACE to talk to tech leaders',
            'ESC to close dialogue'
        ];
        
        const textElements = [];
        let yPos = centerY - 59;
        instructions.forEach(instruction => {
            textElements.push(
                this.add.text(centerX, yPos, instruction, {
                    fontSize: '22px',
                    fontFamily: 'Arial',
                    color: '#000000'
                }).setOrigin(0.5)
            );
            yPos += 40;
        });
        
        return { title, textElements };
    }
    
    addCloseButton(x, y, callback) {
        const adjustedY = y + 10;
        
        const buttonWidth = 120;
        const buttonHeight = 40;
        const cornerRadius = 10;
        
        const closeButton = this.add.graphics();
        closeButton.fillStyle(0x87CEEB, 1);
        closeButton.fillRoundedRect(x - buttonWidth / 2, adjustedY - buttonHeight / 2, buttonWidth, buttonHeight, cornerRadius);
        closeButton.lineStyle(2, 0x000000, 1);
        closeButton.strokeRoundedRect(x - buttonWidth / 2, adjustedY - buttonHeight / 2, buttonWidth, buttonHeight, cornerRadius);
        
        const closeText = this.add.text(x, adjustedY, 'Close', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#000000',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        closeButton.setInteractive(
            new Phaser.Geom.Rectangle(x - buttonWidth / 2, adjustedY - buttonHeight / 2, buttonWidth, buttonHeight),
            Phaser.Geom.Rectangle.Contains
        );
        
        closeButton.on('pointerover', () => {
            closeButton.clear();
            closeButton.fillStyle(0x5CACEE, 1);
            closeButton.fillRoundedRect(x - buttonWidth / 2, adjustedY - buttonHeight / 2, buttonWidth, buttonHeight, cornerRadius);
            closeButton.lineStyle(2, 0x000000, 1);
            closeButton.strokeRoundedRect(x - buttonWidth / 2, adjustedY - buttonHeight / 2, buttonWidth, buttonHeight, cornerRadius);
        });
        
        closeButton.on('pointerout', () => {
            closeButton.clear();
            closeButton.fillStyle(0x87CEEB, 1);
            closeButton.fillRoundedRect(x - buttonWidth / 2, adjustedY - buttonHeight / 2, buttonWidth, buttonHeight, cornerRadius);
            closeButton.lineStyle(2, 0x000000, 1);
            closeButton.strokeRoundedRect(x - buttonWidth / 2, adjustedY - buttonHeight / 2, buttonWidth, buttonHeight, cornerRadius);
        });
        
        closeButton.on('pointerdown', callback);
        
        return { button: closeButton, text: closeText };
    }
    
    destroyInstructionElements(elements) {
        elements.overlay.destroy();
        elements.panel.destroy();
        elements.title.destroy();
        
        elements.textElements.forEach(text => text.destroy());
        
        elements.closeButton.destroy();
        elements.closeText.destroy();
    }
}
