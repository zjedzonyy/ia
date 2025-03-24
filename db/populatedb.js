#! /usr/bin/env node
require('dotenv').config();
const config = JSON.parse(process.env.CONFIG);

const { Client } = require("pg");


const removeSQL = `
DROP TABLE categories CASCADE;
DROP TABLE songs CASCADE;
`

const createSchema = `
    CREATE TABLE categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT
    );

    CREATE TABLE songs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        artist VARCHAR(150),
        price NUMERIC(10,2) NOT NULL,
        category_id INT REFERENCES categories(id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`

const insertDummyData = `
    INSERT INTO categories (name, description) VALUES
        ('Rock', 'Rock music from various eras'),
        ('Pop', 'Popular music hits'),
        ('Hip-Hop', 'Rap and hip-hop music'),
        ('Classical', 'Classical compositions'),
        ('Jazz', 'Smooth and classic jazz tracks'),
        ('Electronic', 'EDM and electronic beats');

    INSERT INTO songs (title, artist, price, category_id) VALUES
        ('Bohemian Rhapsody', 'Queen', 9.99, 1), 
        ('Smells Like Teen Spirit', 'Nirvana', 8.99, 1),  
        ('Shape of You', 'Ed Sheeran', 7.99, 2),  
        ('Blinding Lights', 'The Weeknd', 8.49, 2), 
        ('Lose Yourself', 'Eminem', 9.49, 3),  
        ('Sicko Mode', 'Travis Scott', 8.79, 3),  
        ('Clair de Lune', 'Claude Debussy', 6.99, 4),  
        ('Moonlight Sonata', 'Ludwig van Beethoven', 7.49, 4),  
        ('Take Five', 'Dave Brubeck', 8.29, 5),  
        ('What a Wonderful World', 'Louis Armstrong', 7.89, 5),  
        ('Animals', 'Martin Garrix', 8.99, 6), 
        ('Strobe', 'Deadmau5', 9.29, 6);  


`

async function main() {
    console.log("seeding...");
    const client = new Client(config);
    await client.connect();
    // await client.query(removeSQL);
    await client.query(createSchema);
    await client.query(insertDummyData);
    await client.end();
    console.log('done');
}

main();