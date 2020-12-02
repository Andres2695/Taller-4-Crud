const controller = {};
controller.list = (req, res) => {
    req.getConnection((err,conn) =>{
        conn.query('SELECT * FROM customer',(err,customers) => {
            if(err){
                res.json(err);
        }
            res.render('customers',{
                data:customers
            });

        });
    });
};
controller.save = (req,res) => {
    const data = req.body;
    const{name,phone,addresss}= data;

    if(name.length <= 5)
    {
        throw new Error ('name must be at least 5 character long ');
        
        }else if(!/^[a-z]+$/i.test(name))
        {
            throw new Error ('name must be letters');
            
            }else if(phone.length<=6)
            {
            throw new Error ('Phone INVALIDE');
            }
            else if(!/^[0-9]+$/i.test(phone))
            {
                throw new Error ('Phone INVALIDE must be a numbre');
                } else {req.getConnection((err,conn) => {
                conn.query('INSERT INTO customer set ?',[data],(err,customer) => {
                   res.redirect('/');
            
                });
            })

            }
};
controller.edit = (req,res) => {
    const { id }= req.params;
    req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM customer WHERE id = ?',[id],(err,customer)=>{
            res.render('customer_edit',{
                data:customer[0]
            });
        });

    });
};
controller.update = (req,res)=>{
    const { id }= req.params;
    const data = req.body;
    const{name,phone,addresss}= data;
    const newCustomer= req.body;

    if(name.length <= 5){
        throw new Error ('name must be at least 5 character long ');
        }else if(!/^[a-z]+$/i.test(name))
        {
            throw new Error ('name must be letters');
            
            }else if(phone.length<=6)
            {
            throw new Error ('Phone INVALIDE');
            }
            else if(!/^[0-9]+$/i.test(phone))
            {
                throw new Error ('Phone INVALIDE must be a numbre');
                }else{req.getConnection((err,conn)=>{
                        conn.query('UPDATE customer set ? WHERE id = ?',[newCustomer,id], (err,rows)=>{
                            res.redirect('/');
                
                        });
                    });
                }

};
controller.delete = (req,res) => {
    const { id }= req.params;
req.getConnection((err,conn) =>{
    conn.query('DELETE FROM customer WHERE id = ?', [id],(err,rows)=>{
        res.redirect('/');

    });
})
};
module.exports = controller;

