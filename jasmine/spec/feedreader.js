/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    // Test suite for RSS feed variable
    describe('RSS Feeds', function() {
        // Test if all feed variable is defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // Test if feed's url is defined and not empty
        it('url defined', function() {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        // Test if feed's name property is defined and not empty
        it('has name', function() {
            for(let feed of allFeeds) {
                expect(feed.name).not.toBe(undefined);
                expect(feed.name).not.toBe('');
            }
        });
    });


    // Test suite for the apps menu functionality
    describe('The menu', function() {

        // Test that the default state of the menu is hidden on page load
        it('is hidden', function() {
            const body = document.querySelector('body');
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

        // Test that menu toggles from multiple clicks
        it('toggles on/off', function() {
            const menu = document.querySelector('.menu-icon-link');
            const body = document.querySelector('body');
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });    
    });

    // Test suite for initial load of feed
    describe('Initial Entries', function() {

        // Load the feed and wait until complete
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        // Test if completed work contains any content
        it('loads feed', function() {
            const container = document.querySelector('.feed');
            expect(container.children.length > 0).toBe(true);
        });
    });

    // Test suite for loading new content after initial load
    describe('New Feed Selection', function() {

        const container = document.querySelector('.feed');
        const firstFeed = [];

        // Load multiple feeds and compare content to ensure change
        beforeEach(function(done) {

            // Load first feed
            loadFeed(0);
            
            // Store values of first feed
            Array.from(container.children).forEach(content => {
                firstFeed.push(content.innerText);
            });

            // Load second feed
            loadFeed(1, done);
        });
        
        // Compare first feed against new feed content
        it('content changes', function() {
            Array.from(container.children).forEach( (content, index) => {
                expect(content.innerText !== firstFeed[index]).toBe(true);
            });
        });
    
    });
}());
