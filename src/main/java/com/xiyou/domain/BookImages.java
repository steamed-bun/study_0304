package com.xiyou.domain;


public class BookImages {

    private Integer imageId;
    private String imageURL;
    private Book book;

    public Integer getImageId() {
        return imageId;
    }

    public void setImageId(Integer imageId) {
        this.imageId = imageId;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public BookImages(Integer imageId, String imageURL, Book book) {
        this.imageId = imageId;
        this.imageURL = imageURL;
        this.book = book;
    }

    public BookImages(String imageURL) {
        this.imageURL = imageURL;
    }

    public BookImages() {
    }
}
