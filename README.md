# README

The proposal of this app is allow write queries against a database and expose embeddable charts and json apis.

[Live demo](https://ohmychart.froti.com/)

![screenshot1](https://cloud.githubusercontent.com/assets/16633/23984277/019aedba-0a19-11e7-8699-f8926f083658.png)
![screenshot2](https://cloud.githubusercontent.com/assets/16633/23984278/01cf907e-0a19-11e7-808a-fc08bada90a1.png)

## Warning

I strongly recommend use a read-only user to connect to the database to avoid deletes, updates or inserts.

## Usage

- Copy `.env.sample` to `.env.dev` with `cp env.sample env.development` and configure it.
- Install gems `bundle install`
- Install node stuff `yarn install`
- Run `foreman start -f Procfile.dev`

## TODO

- [ ] Access control as admin
- [ ] Access control as consumer
- [ ] Add more view options
- [ ] Save charts (query + view options)
- [ ] Docker
