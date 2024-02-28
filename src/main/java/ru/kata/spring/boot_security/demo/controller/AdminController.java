package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.repository.UserRepository;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.Optional;


//@Controller
//@RequestMapping("/admin")
public class AdminController {
    private final RoleService roleService;
    private final UserService userService;
    private final UserRepository userRepository;

    public AdminController(RoleService roleService, UserService userService, UserRepository userRepository) {
        this.roleService = roleService;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @GetMapping("")
    public String indexView(Model model, Principal principal) {
        model.addAttribute("users", userService.findAll());
        model.addAttribute("username", principal.getName());
        model.addAttribute("user", userService.findByUsername(principal.getName()).get());
        model.addAttribute("allRoles", roleService.findAll());
        model.addAttribute("newUser", new User());
        return "admin";
    }
    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        userService.delete(id);
        return "redirect:/admin";
    }
    @GetMapping("/add") // форма для добавления нового пользователя
    public String addUserForm(Model model) {
        User user = new User();
        model.addAttribute("user", user);
        List<Role> roles = (List<Role>) roleService.findAll();
        model.addAttribute("allRoles", roles);
        return "addUser";
    }

    @PostMapping ("/addUser")// добавление нового пользователя
    public String add(@Valid @ModelAttribute("user") User user) {
        userService.save(user);
        return "redirect:/admin";
    }

    @PostMapping("/update")   //кнопка
    public String add(@RequestParam("id") Long id,  Model model) {
        //User user = userService.findById(id).get();
       // model.addAttribute("user", user);
        List<Role> roles = (List<Role>) roleService.findAll();
        model.addAttribute("allRoles", roles);
        return "addUser";

    }
    @PatchMapping("/update1/{id}")
    public String add1(@PathVariable("id") Long id, @Valid @ModelAttribute("user") User user, Model model){
        List<Role> roles = (List<Role>) roleService.findAll();
        model.addAttribute("allRoles", roles);
        userService.update(id, user);
        return "redirect:/admin";
    }
//    @GetMapping("/update1") // ссылка
//    public String updateUser(@RequestParam("id") Long id, Model model) {
//        User user = userService.findById(id).get();
//        model.addAttribute("user", user);
//        List<Role> roles = (List<Role>) roleService.findAll();
//        model.addAttribute("allRoles", roles);
//        return "addUser";
//    }
}
