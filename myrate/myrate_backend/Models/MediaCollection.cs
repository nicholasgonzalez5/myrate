﻿/**
* Authors:   Alyse  Palsulich, Nicholas Gonzalez
* Date:      12-08-2022
* Course:    CS 4500, University of Utah, School of Computing
* Copyright: CS 4500 and Alyse Palsulich, Nicholas Gonzalez, Justin Springborn, and Rosemary Yoo - This work may not be copied for use in Academic Coursework.
*
* I, Alyse Palsulich, Nicholas Gonzalez, Justin Springborn, and Rosemary Yoo,
* certify that I wrote this code from scratch and did not copy it in part or 
* whole from another source. Any references used in the completion of the assignment 
* are cited in my README file and in the appropriate method header.
*
* File Contents
* Model class for collections. Stores collection name, description, and lists of the media in collection.
*/
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace myrate_backend.Models
{
    public class MediaCollection
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public List<Book> Books { get; set; } = new List<Book>();
        public List<Music> Songs { get; set; } = new List<Music>();
        public List<Movie> Movies { get; set; } = new List<Movie>();
        public List<TVShow> TvShows { get; set; } = new List<TVShow>();
    }
}