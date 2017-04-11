package com.xiyou.domain;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Random;
import javax.imageio.ImageIO;

public class CaptchaProductor {
    private int width = 160;
    private int height = 40;
    private int codeCount = 5;
    private int lineCount = 150;
    private String code = null;
    private BufferedImage buffImg = null;
    private char[] codeSequence = new char[]{'1', '2', '3', '4', '5', '6', '7', '8', '9'};

    public CaptchaProductor() {
        this.createCode();
    }

    private Font generateFont(int fontSize) {
        Font font = new Font("Arial", 0, fontSize);
        return font;
    }

    public CaptchaProductor(int width, int height) {
        this.width = width;
        this.height = height;
        this.createCode();
    }

    public CaptchaProductor(int width, int height, int codeCount, int lineCount) {
        this.width = width;
        this.height = height;
        this.codeCount = codeCount;
        this.lineCount = lineCount;
        this.createCode();
    }

    public void createCode() {
        boolean x = false;
        boolean fontHeight = false;
        boolean codeY = false;
        boolean red = false;
        boolean green = false;
        boolean blue = false;
        int var15 = this.width / (this.codeCount + 1);
        int var16 = this.height - 1;
        int var17 = this.height - 4;
        this.buffImg = new BufferedImage(this.width, this.height, 4);
        Graphics2D g = this.buffImg.createGraphics();
        Random random = new Random();
        g.setColor(Color.WHITE);
        g.fillRect(0, 0, this.width, this.height);
        Font font = this.generateFont(var16);
        g.setFont(font);

        int i;
        int var18;
        int var19;
        int var20;
        for(int randomCode = 0; randomCode < this.lineCount; ++randomCode) {
            i = random.nextInt(this.width);
            int strRand = random.nextInt(this.height);
            int xe = i + random.nextInt(2);
            int ye = strRand + random.nextInt(2);
            var18 = random.nextInt(255);
            var19 = random.nextInt(255);
            var20 = random.nextInt(255);
            g.setColor(new Color(var18, var19, var20));
            g.drawLine(i, strRand, xe, ye);
        }

        StringBuffer var21 = new StringBuffer();

        for(i = 0; i < this.codeCount; ++i) {
            String var22 = String.valueOf(this.codeSequence[random.nextInt(this.codeSequence.length)]);
            var18 = random.nextInt(200);
            var19 = random.nextInt(200);
            var20 = random.nextInt(200);
            g.setColor(new Color(var18, var19, var20));
            g.drawString(var22, (i + 1) * var15, var17);
            var21.append(var22);
        }

        this.code = var21.toString();
    }

    public void write(String path) throws IOException {
        FileOutputStream sos = new FileOutputStream(path);
        this.write((OutputStream)sos);
    }

    public void write(OutputStream sos) throws IOException {
        ImageIO.write(this.buffImg, "png", sos);
        sos.close();
    }

    public BufferedImage getBuffImg() {
        return this.buffImg;
    }

    public String getCode() {
        return this.code;
    }
}
