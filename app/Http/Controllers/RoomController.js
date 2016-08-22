'use strict'

const Room = use('App/Model/Room')
const Guest = use('App/Model/Guest')
const Database = use('Database')

const MarkdownIt  = require('markdown-it')
const md          = new MarkdownIt()
const json2csv    = require('json2csv')

class RoomController {

  * index (request, response) {
    const rooms = yield Room.all();
    return response.json(rooms);
  }

  * store (request, response) {

    const input = request.all();
    const count = yield Database.from('rooms').count('id as id')

    let room = {
      roomID : count[0].id + 1,
      name   : input.class + '-' + input.date,
      date   : input.date,
      class  : input.class,
      desc   : input.description
    }
    room = yield Room.create(room);

    return response.json(room);
  }

  * show (request, response) {
    
    const room = yield Room.findBy('id', request.param('id'));

    if (room) {
      room.desc = md.render(room.desc);
      return response.json(room);
    } else {
      return response.json({ noRoom: true })
    }   
  }

  * update (request, response) {

  }

  * export (request, response) {

    const roomID = request.param('id');
    const guests = yield Guest.query().where('roomID', roomID).fetch();

    let fields = ['name', 'date', 'class', 'email'];
    if (guests.value().length < 1) { return response.redirect('/#/admin?c=2') }
    let allGuests = guests.value().map( guest => guest.attributes)

    json2csv({ data: allGuests, fields: fields }, function (err, csv) {
      if (err) console.log(err);
      response.header('Content-disposition', 'attachment; filename='+ `room-${roomID}-export.csv`);
      response.send(csv);
    })

  }

}

module.exports = RoomController
