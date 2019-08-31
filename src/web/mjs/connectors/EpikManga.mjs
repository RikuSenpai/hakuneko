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
        let mangaList = [
            {
                id: 'dragonball',
                title: 'Tutorial: Dragonball'
            },
            {
                id: 'onepiece',
                title: 'Tutorial: One Piece'
            }
        ];
        callback( null, mangaList );
    }

    _getChapterList( manga, callback ) {
        callback(new Error('Not implemented!'), undefined);
    }

    _getPageList( manga, chapter, callback ) {
        callback(new Error('Not implemented!'), undefined);
    }
}