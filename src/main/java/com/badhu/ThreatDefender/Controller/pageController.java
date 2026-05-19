package com.badhu.ThreatDefender.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class pageController {

    @GetMapping("/admin")
    public String admin(){
        return "adminPannel/admin";
    }
}
