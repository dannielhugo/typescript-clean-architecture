export default function (router, accountCtrl) {
  router.get('/accounts', accountCtrl.list);
  router.post('/accounts', accountCtrl.create);
}
