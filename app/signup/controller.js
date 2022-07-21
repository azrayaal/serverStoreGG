const User = require('../users/model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const user = await User.find();

      res.render('admin/signup/view_signup', {
        alert,
        user,
        name: req.session.user.name,
        title: 'Halaman Signup',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/signup');
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render('admin/signup/create', {
        name: req.session.user.name,
        title: 'Halaman tambah user',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/signup');
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { name, email, password, role, status, phoneNumber } = req.body;

      let user = await User({ name, email, password, role, status, phoneNumber });
      await user.save();

      req.flash('alertMessage', 'Berhasil tambah user');
      req.flash('alertStatus', 'success');

      res.redirect('/signup');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/signup');
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await User.findOne({ _id: id });

      res.render('admin/signup/edit', {
        user,
        name: req.session.user.name,
        title: 'Halaman ubah kategori',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/signup');
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, password, role, status, phoneNumber } = req.body;

      await User.findOneAndUpdate(
        {
          _id: id,
        },
        { name, email, password, role, status, phoneNumber }
      );

      req.flash('alertMessage', 'Berhasil ubah user');
      req.flash('alertStatus', 'success');

      res.redirect('/signup');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/signup');
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await User.findOneAndRemove({
        _id: id,
      });

      req.flash('alertMessage', 'Berhasil hapus user');
      req.flash('alertStatus', 'success');

      res.redirect('/signup');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/signup');
    }
  },
};
