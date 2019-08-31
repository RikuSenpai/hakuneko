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
        let chapterList = [
            {
                id: manga.id + '/ch1',
                title: manga.title + ' - Chapter 001'
            },
            {
                id: manga.id + '/ch2',
                title: manga.title + ' - Chapter 002'
            }
        ];
        callback( null, chapterList );
    }

    _getPageList( manga, chapter, callback ) {
        callback(new Error('Not implemented!'), undefined);
    }
}