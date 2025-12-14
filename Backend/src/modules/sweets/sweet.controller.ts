import { Request, Response, NextFunction } from "express";
import { SweetService } from "./sweet.service.js";

export const createSweet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sweet = await SweetService.createSweet(req.body);
    res.status(201).json(sweet);
  } catch (err) {
    next(err);
  }
};

export const getAllSweets = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const sweets = await SweetService.getAllSweets();
    res.json(sweets);
  } catch (err) {
    next(err);
  }
};

export const searchSweets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sweets = await SweetService.searchSweets(req.query);
    res.json(sweets);
  } catch (err) {
    next(err);
  }
};

export const updateSweet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sweet = await SweetService.updateSweet(req.params.id, req.body);
    res.json(sweet);
  } catch (err) {
    next(err);
  }
};

export const deleteSweet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await SweetService.deleteSweet(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};


//inventory purchase API
export const purchaseSweet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sweet = await SweetService.purchaseSweet(
      req.params.id,
      req.body.quantity || 1
    );
    res.json(sweet);
  } catch (err) {
    next(err);
  }
};
//inventory management API
export const restockSweet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sweet = await SweetService.restockSweet(req.params.id, req.body.quantity);
    res.json(sweet);
  } catch (err) {
    next(err);
  }
};
