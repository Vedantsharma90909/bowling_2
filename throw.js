AFRAME.registerComponent("throw",{
    init:function(){
        this.ball_throw()
    },
    ball_throw:function(){
        window.addEventListener("keydown" ,(e) => {
            if(e.key==="z"){
                const bullet_entity = document.createElement("a-entity")
                bullet_entity.setAttribute("geometry",{primitive:"sphere",radius:0.25})
                bullet_entity.setAttribute("material","color","black")
                const camera = document.querySelector("#camera")
                var camera_1 = document.querySelector("#camera").object3D
                var direction = new THREE.Vector3()
                camera_1.getWorldDirection(direction) 
                console.log(direction)
                var position = camera.getAttribute("position")
                bullet_entity.setAttribute("position",{x:0,y:-1,z:0})
                bullet_entity.setAttribute("velocity",direction.multiplyScalar(-10))
                bullet_entity.setAttribute("dynamic-body",{shape:"sphere",mass:0})
                var scene = document.querySelector("#scene")
                scene.appendChild(bullet_entity)
                bullet_entity.addEventListener("collide", (e) => { 
                    var element = e.detail.target.el
                    var element_hit = e.detail.body.el
        
                    if(element_hit.id.includes("pin")){
                        var impulse = new CANNON.Vec3(-2,2,1)
                        var word_point = new CANNON.Vec3().copy(element_hit.getAttribute("position"))
                        console.log(word_point)
                        element_hit.body.applyImpulse(impulse,word_point)
                        element.removeEventListener("collide",this.shoot_bullet)
                        var scene = document.querySelector("#scene")
                        scene.removeChild(element)
                }})
            }
        })
    },
    // remove_ball:function(e){
    //     // console.log(e.detail.target.el)
    //     // bullet
    //     // console.log(e.detail.body.el)
    //     //box
    //     var element = e.detail.target.el
    //     var element_hit = e.detail.body.el

    //     if(element_hit.id.includes("pin")){
    //         var impulse = new CANNON.Vec3(-2,2,1)
    //         var word_point = new CANNON.Vec3().copy(element_hit.getAttribute("position"))
    //         console.log(word_point)
    //         element_hit.body.applyImpulse(impulse,word_point)
    //         element.removeEventListener("collide",this.shoot_bullet)
    //         var scene = document.querySelector("#scene")
    //         scene.removeChild(element)
    //     }


    // }
})