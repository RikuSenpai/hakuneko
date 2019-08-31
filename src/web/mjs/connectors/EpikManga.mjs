import Connector from '../engine/Connector.mjs';

export default class EpikManga extends Connector {

    constructor() {
        super();
        super.id = 'epikmanga';
        super.label = 'Epik Manga';
        this.tags = [ 'webtoon', 'turkish' ];
        this.url = 'https://www.epikmanga.com';
    }

    _getMangaList( callback ) {
        let request = new Request( this.url + '/seri-listesi?type=text', this.requestOptions );
        this.fetchDOM( request, 'div#pop-href div[id^=char-] a' )
            .then( data => {
                let mangaList = data.map( element => {
                    return {
                        id: this.getRootRelativeOrAbsoluteLink( element, request.url ),
                        title: element.text.trim()
                    };
                } );
                callback( null, mangaList );
            } )
            .catch( error => {
                console.error( error, this );
                callback( error, undefined );
            } );
    }

    _getChapterList( manga, callback ) {
        let request = new Request( this.url + manga.id, this.requestOptions );
        this.fetchDOM( request, 'table.table tbody tr td:first-of-type a' )
            .then( data => {
                let chapterList = data.map( element => {
                    return {
                        id: this.getRootRelativeOrAbsoluteLink( element, request.url ),
                        title: element.text.trim(),
                        language: ''
                    };
                } );
                callback( null, chapterList );
            } )
            .catch( error => {
                console.error( error, manga );
                callback( error, undefined );
            } );
    }

    _getPageList( manga, chapter, callback ) {
        let request = new Request( this.url + chapter.id, this.requestOptions );
        this.fetchDOM( request, 'div#reader div.chapter-content source.chapter-img' )
            .then( data => {
                let pageList = data.map( element => this.getAbsolutePath( element, request.url ) );
                callback( null, pageList );
            } )
            .catch( error => {
                console.error( error, manga );
                callback( error, undefined );
            } );
    }
}