package com.badhu.ThreatDefender;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class pageController {

    @GetMapping("/admin")
    public String admin(){
        return "adminPannel/admin";
    }
}
