import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';

function AddBook(props) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [published, setPublished] = useState('');
    const [genre, setGenre] = useState('');
    const [pages, setPages] = useState(0);
    const [quote, setQuote] = useState('');
    const [overview, setOverview] = useState('');
    const [price, setPrice] = useState(0);
    const [favorite, setFavorite] = useState(false);
    const [file, setFile] = useState({});
    const [loading, setLoading] = useState(false);
    const alert = useAlert();

    const addBook = async e => {
        e.preventDefault();
        setLoading(true);

        // Prepare file to be uploaded
        const formData = new FormData();
        formData.append('file', file);

        // Upload file
        const responseFromCover = await fetch('/books/cover', {method: 'POST', body: formData });
        const dataFromCover = await responseFromCover.json();

        // Create book object
        const book = {
            title,
            author,
            published,
            genre,
            pages,
            // Relate image with book
            cover: dataFromCover.file.filename,
            quote,
            overview,
            price,
            favorite
        }

        // Config options to post book
        const options = { 
            method: 'POST',
            headers: { 
                'content-type': 'application/json'
            },
            body: JSON.stringify(book),
        }

        // Post book
        try {
            const response = await fetch('/books', options)
            const data = await response.json();
            if (data.success) {
                alert.success(`${data.book.title} has been added!`);
                setLoading(false);
                window.loaction = '/#/users/user';
            }
        }
        catch(err) {
            alert.error('The server is not responding... Please try again later.');
            setLoading(false);
            console.log(err);
        }

        props.dispatch({
            type: 'UPDATE_BOOKS',
        })
       
    }

    return (
        <section className="addBook">
            { loading ? <div className="loading"></div> : null }
            <h3 className="sectionHeading">Add Book</h3>
            <form className="addBookForm" encType="multipart/form-data" onSubmit={addBook}>

                <label htmlFor="title">Title</label>
                    <input type="text" name="title" placeholder="Lord of the Rings" onChange={(e) => setTitle(e.target.value)} />
                
                <label htmlFor="author">Author</label>
                    <input type="text" name="author" placeholder="J. R. R. Tolkien" onChange={(e) => setAuthor(e.target.value)} />
                
                <label htmlFor="published">Published</label>
                    <input type="number" name="published" placeholder="YYYY" onChange={(e) => setPublished(e.target.value)} />
                
                <label htmlFor="genre">Genre</label>
                    <input type="text" name="genre" placeholder="Fantasy" onChange={(e) => setGenre(e.target.value)} />
                
                <label htmlFor="pages">Pages</label>
                    <input type="number" name="pages" placeholder="1237" onChange={(e) => setPages(e.target.value)} />
                
                <label htmlFor="quote">Quote</label>
                    <input type="text" name="quote" placeholder="His old life lay behind in the mists, dark adventure lay in front." onChange={(e) => setQuote(e.target.value)} />
                
                <label htmlFor="overview">Overview</label>
                    <textarea name="overview" id="overview" cols="31" rows="10" placeholder="The story began as a sequel to Tolkien's 1937 fantasy novel The Hobbit, but eventually developed into a much larger work..." onChange={(e) => setOverview(e.target.value)} ></textarea>       

                <label htmlFor="price">Price</label>
                    <input type="number" step="0.01" name="price" placeholder="9.99" onChange={(e) => setPrice(e.target.value)} />                

                <label htmlFor="favorite">Favorite
                    <input type="checkbox" name="title" onChange={(e) => setFavorite(e.target.checked)} />
                    </label>

                <label htmlFor="file"></label>
                    <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} />

                <button type="submit">Submit</button>
            </form>
        </section>
    )
}

const mapStateToProps = state => {
    return {state}
};

export default connect(mapStateToProps)(AddBook);