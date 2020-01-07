var Camera = function(opt_src){
    this.eye_point = opt_src[0];
    this.look_at_point = opt_src[1];
    this.head_vec_y = opt_src[2];
    this.look_vec_un = this.look_at_point.substract(this.eye_point);
    this.look_vec = this.look_at_point.substract(this.eye_point).normalize();
    this.head_vec_x = this.look_vec.cross(this.head_vec_y);
    console.log(this.head_vec_x);
    console.log(this.head_vec_y);
    console.log(this.look_vec);
    
}
