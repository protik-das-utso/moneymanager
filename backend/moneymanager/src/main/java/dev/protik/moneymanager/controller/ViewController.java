package dev.protik.moneymanager.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("/")
    public String index() {
        return "redirect:/login";
    }

    @GetMapping("/login")
    public String signin() {
        return "login";
    }

    @GetMapping("/register")
    public String signup() {
        return "register";
    }

    @GetMapping("/activation")
    public String activation() {
        return "activation";
    }


//    @GetMapping("/home")
//    public String home(Model model) {
//        // Fetch the categories data (replace with actual service call or logic)
//        List<String> categories = List.of("Category1", "Category2", "Category3");
//
//        // Add the categories to the model
//        model.addAttribute("categories", categories);
//
//        return "dashboard";
//    }
}
